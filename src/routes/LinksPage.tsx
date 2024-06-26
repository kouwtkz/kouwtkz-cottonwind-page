import axios from "axios";
import { useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { useDataState } from "@/state/StateSet";
import { MakeRelativeURL } from "@/components/doc/MakeURL";
import SiteConfigList from "@/data/config.list";

export default function LinksPage() {
  return (
    <div className="linkPage">
      <h2 className="lulo">LINKS</h2>
      <div>
        <h3 className="leaf">各拠点</h3>
        <ul>
          {SiteConfigList.links.map((item, i) => {
            return (
              <li key={i}>
                <a href={item.url} target="_blank">{item.title ?? item.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="leaf">サイトのバナー</h3>
        <div className="bannerArea">
          <div>
            <div>200×40 px</div>
            <img
              src="/static/images/banner/banner_cottonwind_200_40.png"
              alt="200×40バナー"
              width={200}
              height={40}
            />
          </div>
          <div>
            <div>234×60 px</div>
            <img
              src="/static/images/banner/banner_cottonwind_234_60.png"
              alt="234×60バナー"
              width={234}
              height={60}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="leaf">その他</h3>
        <div>
          <InviteDiscordLink />
        </div>
        <p>
          <Link to="/blog">サイト内ブログ</Link>
        </p>
        <p>
          <a href="/suggest">Suggest page (links for miss typo)</a>
        </p>
      </div>
    </div>
  );
}

function InviteDiscordLink({
  children = "Discordのコミュニティサーバー",
}: {
  children?: React.ReactNode;
}) {
  const [search, setSearch] = useSearchParams();
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const invite = search.get("invite");
  const { isComplete } = useDataState();
  const question = useMemo(async () => {
    return axios.get("/fetch/discord/invite").then((r) => r.data);
  }, []);
  useEffect(() => {
    if (isComplete && invite === "discord") {
      anchorRef.current!.click();
      search.delete("invite");
      setSearch(search, { replace: true, preventScrollReset: true });
    }
  }, [isComplete, invite]);
  return (
    <a
      title="Discordの招待リンク（合言葉入力式）"
      href="?invite=discord"
      target="discord"
      ref={anchorRef}
      onClick={async (e) => {
        const element = anchorRef.current!;
        if (!element.hasAttribute("invited")) {
          e.preventDefault();
          const answer = prompt(await question);
          if (answer) {
            axios
              .get(
                MakeRelativeURL({
                  pathname: "/fetch/discord/invite",
                  query: { invite_password: answer },
                })
              )
              .then((r) => {
                element.title = "Discordの招待リンク";
                element.href = r.data;
                element.setAttribute("invited", "");
                element.click();
              })
              .catch((e) => {
                toast.error(`認証に失敗しました [${e}]`);
              });
          }
        }
      }}
    >
      {children}
    </a>
  );
}
