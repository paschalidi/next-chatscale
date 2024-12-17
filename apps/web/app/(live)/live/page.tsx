import { PageView } from "@/components/live/page-view";
import { Suspense } from "react";

export default async function Live() {


  return <Suspense fallback={<div>Loading...</div>}>
    <PageView/>
  </Suspense>
}