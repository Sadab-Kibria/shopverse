import { updateSpecs } from "@/scripts/updateSpecs";

export async function GET(request: Request) {
    //await updateSpecs()
    return Response.json({success:true})
}
