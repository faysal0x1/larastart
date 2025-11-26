
import Home from './Home';
import { Head } from '@inertiajs/react';
import WebLayout from "../../../layouts/web/WebLayout.jsx";

function Index() {
  return (
    <>
      <Head
        title='TBZ - The Best Zone - Home'
      />
      <WebLayout>
        <Home />
      </WebLayout>
    </>
  );
}

export default Index;
