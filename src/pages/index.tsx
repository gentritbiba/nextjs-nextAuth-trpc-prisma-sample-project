import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from  'next-auth/react';

const Home: NextPage = (props) => {
  const hello = trpc.useQuery(["example.hello", { text: "sample text" }])
  const {data, status} = useSession();
  return (
    <>
      <Head>x
        <title>Sample NextJS App</title>
        <meta name="description" content="Sample NextJs APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border border-black p-5 m-2 bg-slate-200">
      {
        data ? 
        (<div>
          <p>
            Logged in as {data?.user?.email}
          </p>
          <button onClick={()=>signOut()}> Sign out </button>

        </div>) : (
          <button onClick={()=>signIn()}> Sign in </button>
        )
      }
      </div>
      <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
        {hello.data ? <div>
          <p>{hello.data.greeting}</p>
          <small>{ new Date(hello.data.info.date).toString() }</small>
        </div> : <p>Loading..</p>}
      </div>
    </>
  );
};

export default Home;
