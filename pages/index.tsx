import {GetServerSideProps} from "next";
import {getDatabaseConnection} from "../lib/getDatabaseConnection";

export default function Home() {
  return (
    <div className="container">
      首页
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const connection = await getDatabaseConnection()
  return {
    props: {}
  }
}