import { NextRequest, NextResponse } from "next/server";
import { deleteNotice, incrementViews } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  await deleteNotice(Number(id));
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await incrementViews(Number(id));
  return NextResponse.json({ ok: true });
}
