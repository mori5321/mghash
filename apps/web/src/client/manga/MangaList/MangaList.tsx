import { supabaseSSR } from "../../../server/common/supabase/client";
import styles from "./MangaList.module.css";

export const MangaList = async () => {
  const manga = await supabaseSSR.from("manga").select("tweet_id,title");

  if (manga.error) {
    // TODO: Suspense 対応にしたいね
    return <div>Error</div>;
  }

  if (manga.data == null) {
    return (
      <div>No Data</div>
    )
  }

  return (
    <div>
      {manga.data.map((manga) => (
        <MangaListPanel id={manga.tweet_id} title={manga.title} />
      ))}
    </div>
  );
};


type MangaListPanelProps = {
  id: string;
  title: string;
}
export const MangaListPanel = ({ id, title }: MangaListPanelProps) => {
  return (
    <div key={id} className={styles.mangaListPanel}>
      {title}
    </div>
  )
}
