import {GetServerSideProps} from "next";
import {createConnection, getConnection} from "typeorm";

export default function Home() {
  return (
    <div className="container">
      首页
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const connection = await createConnection()
  return {
    props: {}
  }
}