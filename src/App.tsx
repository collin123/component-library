import "./index.css"
import SearchBar from "./search-bar/SearchBar";
import Card from "./card/Card.tsx"

export default function App() {
  return (
    <>
      <div className="border-black border-2 rounded h-screen w-screen">
        <SearchBar />
        <Card />
      </div>
    </>
)
}
