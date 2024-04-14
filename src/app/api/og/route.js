// Import required modules and constants
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// Route segment config
export const runtime = "edge";

// Define a function to handle GET requests
export async function GET(req) {
    // Extract title from query parameters
    const { searchParams } = req.nextUrl;
    const postTitle = searchParams.get("title");

    // Create an ImageResponse with dynamic content
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100vh", // sets the height to be 100% of the viewport height
                    width: "100vw", // sets the width to be 100% of the viewport width
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(http://localhost:3000/opengraph-image.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: 'white',
                }}
            >
                <div
                    style={{
                        marginLeft: 190,
                        marginRight: 190,
                        display: "flex",
                        fontSize: 140,
                        letterSpacing: "-0.05em",
                        fontStyle: "normal",
                        color: "white",
                        lineHeight: "120px",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {postTitle}
                </div>
            </div>
        ),
        {
            width: 1920,
            height: 1080,
        },
    );
}