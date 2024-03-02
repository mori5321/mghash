import { supabase } from "./src/server/common/supabase/client"

export const MangaList = async () => {
  const manga = await supabase.from('mangas').select('tweet_id,title');

  if (manga.data === null) {
    return <div>データがありません</div>
  }

  return (
    <div>
      {
        manga.data.map((manga) => (
          <div key={manga.tweet_id}>
            <h3>{manga.title}</h3>
          </div>
        ))}
    </div>
  )
}
