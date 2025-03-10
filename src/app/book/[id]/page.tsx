import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

//정적으로 빌드타임에 만들어서 조금이나마 속도 향상
export function generrateStaticParams() {
  return [{ id: "1" }];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`, { cache: "force-cache" });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
  }

  const book: BookData = await response.json();

  const { coverImgUrl, title, subTitle, author, publisher, description } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        저자: {author} | 출판사: {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
