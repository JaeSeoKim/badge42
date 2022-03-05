import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";

export default function MePage() {
  const { data, status } = useSession();

  return (
    <Layout>
      <div>
        <code>{status}</code>
      </div>
      <pre className="border border-stone-600 p-8 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </Layout>
  );
}
