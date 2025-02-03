import {useSearchParams} from "@solidjs/router";
import Counter from "../counter/counter.component";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  setSearchParams({name: 'bob'});

  return (
    <>
      <h1>Home</h1>
      <div class="card">
        <Counter />
      </div>
      <p>{searchParams.name}</p>
    </>
  )
}