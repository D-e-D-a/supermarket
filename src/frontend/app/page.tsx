import Products from "../components/Products";

export default async function Home() {
  const data = await getServerSideProps();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">
        Dobrodosli na nas sajt za proizvode
      </h1>
      <Products data={data} />
    </main>
  );
}

async function getServerSideProps() {
  const timestamp = new Date().getTime();
  const res = await fetch(
    `http://localhost:8000/api/products?timestamp=${timestamp}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
