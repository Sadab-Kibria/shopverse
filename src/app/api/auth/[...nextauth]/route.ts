import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Extend built-in types
declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Combined Credentials Provider for both Admin and Users
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // Optional field to distinguish admin login
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Get admin credentials from environment variables
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        // Check if credentials match admin environment variables
        if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
          return {
            id: "admin-1",
            name: "Administrator",
            email: ADMIN_EMAIL,
            role: "admin",
          };
        }

        // If not admin, check database for regular users
        try {
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email))
            .limit(1);

          if (!user) return null;
          
          // Check if user has a password (not a Google-only user)
          if (!user.password) return null;

          // Verify password
          const match = await bcrypt.compare(credentials.password, user.password);
          if (!match) return null;

          return {
            id: String(user.id),
            name: user.name ?? user.email, // fallback to email if name not set
            email: user.email,
            role: user.role || "user",
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),

    // Google OAuth for users
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Add user info to token on sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      
      // Handle session updates if needed
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      // Google sign-in handling
      if (account?.provider === "google" && user.email) {
        try {
          const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, user.email))
            .limit(1);

          if (!existingUser) {
            // Insert new user for Google
            await db.insert(users).values({
              name: user.name ?? profile?.name ?? null,
              email: user.email,
              role: "user",
              // Google users don't get a password initially
              password: null,
            });
          }
          return true;
        } catch (err) {
          console.error("Google sign-in error:", err);
          return false;
        }
      }
      
      // Credentials login
      if (account?.provider === "credentials") {
        // Check if this is an admin login (from environment variables)
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        if (user.email === ADMIN_EMAIL) {
          // Admin login - check if admin exists in database
          try {
            const [existingAdmin] = await db
              .select()
              .from(users)
              .where(eq(users.email, ADMIN_EMAIL))
              .limit(1);

            if (!existingAdmin) {
              // Create admin user in database if doesn't exist
              await db.insert(users).values({
                name: "Administrator",
                email: ADMIN_EMAIL,
                role: "admin",
                // Admin password is stored in env, not in db for security
                password: null,
              });
            }
          } catch (err) {
            console.error("Admin creation error:", err);
          }
        }
        
        return true;
      }
      
      return true;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/signup",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };