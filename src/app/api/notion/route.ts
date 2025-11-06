import { NextResponse } from "next/server";

import { notion } from "~/lib/notion";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const databaseId = `${process.env.NOTION_DB}`;
    
    // Check if email already exists in the database
    const existingUser = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Email",
        email: {
          equals: body?.email,
        },
      },
    });

    if (existingUser.results && existingUser.results.length > 0) {
      return NextResponse.json(
        { error: "This email is already on the waitlist", success: false },
        { status: 409 } // 409 Conflict status code
      );
    }

    // Email doesn't exist, proceed with creating new entry
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Email: {
          type: "email",
          email: body?.email,
        },
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: body?.name,
              },
            },
          ],
        },
        "Suggested features": {
          type: "rich_text",
          rich_text: body?.suggestedFeatures
            ? [
                {
                  type: "text",
                  text: {
                    content: body.suggestedFeatures,
                  },
                },
              ]
            : [],
        },
      },
    });

    if (!response) {
      return NextResponse.json(
        { error: "Failed to add email to Notion" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email added to Notion", success: true, pageId: response.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add email to Notion", success: false },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  try {
    // First, find the page by email
    const databaseId = `${process.env.NOTION_DB}`;
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Email",
        email: {
          equals: body?.email,
        },
      },
    });

    if (!response.results || response.results.length === 0) {
      return NextResponse.json(
        { error: "User not found in Notion database" },
        { status: 404 }
      );
    }

    const pageId = response.results[0].id;

    // Update the page with suggested features
    await notion.pages.update({
      page_id: pageId,
      properties: {
        "Suggested features": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body?.suggestedFeatures || "",
              },
            },
          ],
        },
      },
    });

    return NextResponse.json(
      { message: "Suggested features updated", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update Notion page", success: false },
      { status: 500 }
    );
  }
}
