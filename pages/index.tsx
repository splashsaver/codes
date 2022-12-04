import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { FiCopy } from "react-icons/fi";
import copy from "copy-to-clipboard";
import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col mx-auto text-white items-center justify-center h-screen bg-slate-900">
      <Head>
        <title>Generate Beta Code</title>
      </Head>
      <div className="flex flex-col w-[245px] items-center">
        {code ? (
          <div className="flex items-center mb-2 text-slate-300 font-mono justify-center text-sm outline-none bg-slate-700 rounded p-1 px-4">
            {code}{" "}
            <FiCopy
              className="ml-1 cursor-pointer"
              onClick={() => {
                setCopied(true);
                copy(code, { debug: true });
                setTimeout(() => {
                  setCopied(false);
                }, 3000);
              }}
            />
          </div>
        ) : null}
        <div className="text-center mb-5">
          <h1 className="font-semibold text-2xl tracking-wider">
            Generate Beta Code
          </h1>
        </div>
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "90%" }}
        />
        <div className="mt-2" style={{ width: "90%" }}>
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              setError("");
              setCode("");

              setCopied(false);
              setLoading(true);

              fetch("/api/code", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) {
                    setCode(data.code);
                    setLoading(false);
                    setError("");
                  } else {
                    setError(data.error.message);
                    setLoading(false);
                  }
                })
                .catch((err) => {
                  setError(err.error.message);
                  setLoading(false);
                });
            }}
          >
            Generate
          </Button>
          {error ? (
            <p className="text-red-500 text-xs mt-1 text-right">{error}</p>
          ) : null}
          {copied ? (
            <p className="text-slate-300 text-xs mt-1 text-right">
              Copied to clipboard!
            </p>
          ) : null}
          {loading ? (
            <p className="text-slate-300 text-xs mt-1 text-right">Loading...</p>
          ) : null}
        </div>
        <Link
          href={
            process.env.NODE_ENV === "production"
              ? "https://app.splashsaver.com"
              : "http://localhost:3001"
          }
          className="text-slate-300 hover:underline mt-5 text-sm"
          target="_blank"
        >
          app.splashsaver.com
        </Link>
      </div>
    </div>
  );
};

export default Home;
