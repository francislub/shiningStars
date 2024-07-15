import { News } from "@/types/types";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function NewsPage({ params }: Props) {
  const { id } = params;

  let news: News | null = null;

  try {
    const response = await fetch(`https://shining-stars-dashboard.onrender.com/api/v1/news/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    news = await response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  if (!news) {
    return notFound();
  }

  return (
    <div className="pt-[120px] pb-[120px]">
      <div className="container p-20 lg:flex lg:items-center lg:justify-center">
        <div className="lg:w-2/5 lg:pr-10">
          <Image src={news.photo} alt={news.title} width={1200} height={100} className="custom-image" />
        </div> 
        <div className="lg:w-3/5 lg:pl-10 lg:-mt-20">
          <h1 className="text-2xl lg:text-5xl text-center lg:text-left leading-relaxed font-bold">
            {news.title}
          </h1>
        <p className="my-5 text-center text-xl text-gray-400">{news.date}</p>
        {/* <div className="my-5 flex items-center justify-center text-lg">
          <span>{news.title}</span>
        </div> */}
        <div
          className="blog-content text-xl leading-loose flex flex-col gap-5 mt-5"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
      </div>
      </div>
    </div>
  );
}
