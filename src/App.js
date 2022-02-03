import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
      <header className="hero is-danger is-medium has-text-weight-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 has-text-left has-text-weight-bold">GameSeries Amiibo!</h1>
            <p>日本大学文理学部　情報科学科2年　5420050番　土橋一斗</p>
          </div>
        </div>
      </header>
    );
  }
  
  function Image(props) {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
          <img src={props.src} alt="Amiibo"/>
          </figure>
        </div>
      </div>
    );
  }

  function Loading() {
    return <p>ゲームのシリーズを選択することによって，そのシリーズに登場するキャラクターが表示されます．</p>;
  }  
  
  function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
    }
    return (
      <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
          return (
            <div key={url} className="column is-4">
              <Image src={url} />
            </div>
          );
        })}
      </div>
    );
  }

  function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { name } = event.target.elements;
      props.onFormSubmit(name.value);
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="name" defaultValue="">
                  <option value="">ゲームシリーズを選択</option>
                  <option value="Super Mario">スーパーマリオ</option>
                  <option value="Donkey Kong">ドンキーコング</option>
                  <option value="The Legend of Zelda">ゼルダの伝説</option>
                  <option value="Breath of the Wild">ゼルダの伝説　ブレスオブ　ザ　ワイルド</option>
                  <option value="Animal Crossing">どうぶつの森</option>
                  <option value="Pokemon">ポケットモンスター</option>
                  <option value="Star Fox">スターフォックス</option>
                  <option value="Metroid">メトロイド</option>
                  <option value="F-Zero">F-zero（キャプテンファルコン）</option>
                  <option value="Pikmin">ピクミン</option>
                  <option value="Wii Fit">WiiFit</option>
                  <option value="Classic Nintendo">ニンテンドークラシック</option>
                  <option value="Splatoon">スプラトゥーン</option>
                  <option value="Kirby">カービィ</option>
                  <option value="Fire Emblem">ファイヤーエンブレム</option>
                  <option value="Xenoblade">ゼノブレイド</option>
                  <option value="Earthbound">MOTHER</option>
                  <option value="Chibi Robo">ちびロボ</option>
                  <option value="Sonic">ソニック</option>
                  <option value="Pac-Man">パックマン</option>
                  <option value="Street fighter">ストリートファイター</option>
                  <option value="Monster Hunter">モンスターハンター</option>
                  <option value="Final Fantasy">ファイナルファンタジー</option>
                  <option value="Metal Gear Solid">メタルギア</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-danger is-outlined">
                SELECT　GAMETITLE
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }  
  
  function Main() {
    const [urls, setUrls] = useState(null);

    useEffect(() => {
      fetchImages("").then((urls) => {
        setUrls(urls);
      });
    }, []);

    function reloadImages(name) {
      fetchImages(name).then((urls) => {
        setUrls(urls);
      });
    }

    return (
      <main>
        <section className="section">
          <div className="container">
            <Form onFormSubmit={reloadImages} />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }

  
  
  function Footer() {
    return (
      <footer className="footer has-background-info">
        <div className="content has-text-centered">
          <p>これらAmiiboの画像データは，AmiiboAPIから取得し使用しています．</p>
          <p>
            <a href="https://www.amiiboapi.com/">Donate to AmiiboAPI</a>
          </p>
          <p>このサイトは日本大学文理学部情報科学科 Webプログラミングの最終課題によって作成したものです．</p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;