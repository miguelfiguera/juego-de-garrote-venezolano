import React from "react";
import PatioCard from "@/components/patio/PatioCard";
import { index } from "@/lib/firebase/collections/patios";

async function Page() {
  const patios = await index();

  const patioCards = patios.map((patio) => (
    <PatioCard key={patio.id} patio={patio} />
  ));

  if (patios.length === 0) {
    return (
      <div className="container">
        <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">Patios</h1>
        <div className="">
          {" "}
          <h1 className="text-center my-5">
            No hay patios registrados por ahora.
          </h1>
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">Patios</h1>
      <div className="row"></div>
    </div>
  );
}

export default Page;
