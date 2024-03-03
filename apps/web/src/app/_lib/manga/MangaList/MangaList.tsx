import styles from "./MangaList.module.css";
import { supabaseSSR } from "../../common/supabase/client";

export const MangaList = async () => {
  const manga = await supabaseSSR
                  .from("mangas")
                  .select(`
                    tw_conversation_id,
                    pages (
                      tw_tweet_id,
                      page_number,
                      images (
                        id,
                        url,
                        image_number
                      )
                    )
                  `);

  if (manga.error) {
    console.error(manga.error);
    // TODO: Suspense 対応にしたいね
    return <div>Error</div>;
  }

  if (manga.data == null) {
    return (
      <div>No Data</div>
    )
  }

  console.log(manga.data);

  return (
    <div>
      {manga.data.map((manga) => (
        <MangaListPanel id={manga.tw_conversation_id} pages={manga.pages} />
      ))}
    </div>
  );
};


type MangaListPanelProps = {
  id: string;
  pages: {
    tw_tweet_id: string;
    page_number: number
    images: {
      id: string,
      url: string,
      image_number: number
    }[]
  }[]
}
export const MangaListPanel = ({ id, pages }: MangaListPanelProps) => {
  return (
    <div key={id} className={styles.mangaListPanel}>
      <h3>{id}</h3>
      <div>
        {pages.map((page) => (
          <div key={page.page_number}>
            <h4>{page.page_number}</h4>
            { page.images.map((image) => <h5>{image.url}</h5>)}
          </div>
        ))}
      </div>
    </div>
  )
}
