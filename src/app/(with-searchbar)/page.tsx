import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function AllBooks() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error("도서 목록을 가져오는데 실패했습니다.");
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) =>
        <BookItem key={book.id} {...book} />
      )}
    </div>
  );
}

async function RecoBooks() {

  /*
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
 
  await delay(3000); 
  */

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );

  if (!response.ok) {
    throw new Error("추천 도서를 가져오는데 실패했습니다.");
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) =>
        <BookItem key={book.id} {...book} />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>        
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
