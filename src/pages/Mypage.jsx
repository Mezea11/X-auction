import "./Mypage.css";

import { useEffect, useState } from "react";

export default function Mypage() {
  const [numbersList, setNumbersList] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/numbers")
      .then((res) => res.json())
      .then((result) => setNumbersList(result));
  }, []);
  return (
    <>
      <div id="mypage-container">
        <section id="user-info">
          <div className="card border-secondary mb-3" id="mypage-card">
            <div className="card-header">Username</div>
            <div className="card-body text-secondary">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </div>
          <button type="button" class="btn btn-primary">
            Post new auction ad
          </button>
        </section>
      </div>
      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My auction ads</h1>
        <div className="ads-card-container-mypage">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIEBQYDBwj/xAA7EAABAwMCBAQDBgQGAwEAAAABAAIDBAUREiEGEzFBIlFhcRSBkQcyobHB0SNCUmIVJDOS4fAWNIJz/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECBAMF/8QAJBEAAgICAgICAgMAAAAAAAAAAAECEQMhEjEiQRNRBHFCUmH/2gAMAwEAAhEDEQA/APYkIQgBCEqARCVKEAiUBCEAYRhCZLI2GN0jz4W90uuwtjkfkvOr39pZo7vNQwW18kUOA+ZsoG/7qgfe7vxLWCO2X+qo3kF3J+EboaO5L9zj3OFyeWvRdQs9jBB6EfVOwvHJLreLNTh8VdUXh+PFOXNNNF/tGpx9yAolm+0W90d5c25TR1VKGjUyKPQW59D1+qiOWT3WiZRS9nt2EhUK1XKK5QsljIOtoc0tOzge4U4HIyukZKStFGmuxEIKFYgRCVCARCEIBEIQgEKEFCAclQhACAhAQCoQhACEJHHHVAKqm6y/FRVENK9rpWRk+E9HEHH4qrv/ABB/ENFRO3zh7wVmq28SW2enmoZoxMxxzq3a8Ebhw8th691xy+SpHSKrbMLBY62ruTYYnPNQ9+nQ92xPm727n3VxcKqmoYzaLc4fDj/2akDHxUnkP7B2HfqtBJfbNd5zJVums0z2OiqHsh5jJM/0yN6eXiAUC48PWut2o+K7U1nXS9oOn0+/t9Fz+RdSDg/RnDUvp6kPoHiKp7uiOw9/NWUVHQXF5NRFHRXAjUHM2gqT6D+R34H03XePh6wULtdVxZTlvdlLGHOd+LvyKsjebVQUL2Wq0SVoLf8A2bgNLD7NO59gAonlj/EtHHJ9mls7m2ShttMDE+d7C5rdWfDjJPtuB81pKO6U9ThpOh39JOV4zRz3GrrxWve98suGx4bgY8gOwAzstxNHK2IuLtTg7Gpu2CrY/CJLjyN6kPVZmx38620laRv91+ei060J2cWqEQlSKSBEJUiAQoKEIBCkTkiA6IQlQCISoQCISoQCLN8X3n4Kn+FgcOdL1PkPJaOV3KjLz/KC76LxzjC6STVxfqe0l+zmHBz7qsnSLQVs5TVDmtlljLjo++718lyYxtbThzSA5nYjcqjtL52Dx80xzPJe57iNZ65364xjy6LvT1vIc4a8AFcUdn0W9FV00OaaaHlPJyXnOE2bh+puLJKqgZS6WtydZ8WPPYKK2pZV9R4ugJC0VphvlNRSmmpKqOB4Pi5WBg9cZClxXZVSa0Zaitr4qpjppostdnETS7P4BaHlh0bOa0xQO2Ejm51Y6j0UGKhllmcIqdzi05yGOOPdbS0cONrqAyytjc89DnOPqq8Y+lsum/bK63V1rt8bpRLrmx/DaG+Fh8/fHdPoK6nnmlMReTp6djlUN7tMlDK9mANJKo31MkMLiBqDSHaMkZPZc3OTezr8aS0aSur4pJRNQTtM8Di18WcOb6EdVveEbuLhR8t20jG7B3XC8i4aoS+5SVMkLsHLy4t2yR59+pWmtF0Nsv1Ng4YcNePQ9P2XaDozyV6R6sNghAc3AIOxGQhdziIkSpEAIQhAIhKkQHTCE5CARCVCARGB3Sqn4uuL7Vw5XVcJAmEemMn+p2w/PPyQFVdeIZauCqp6CndIGl0ZfnyXkt1rY6uq/gkF0YwWnsUtk4luEFRWRMmJZKdXuRsT81WVETv8WncctLjr+u/6rNybbs0KKrRJmmDWMP8AM4YI7AKCIeaTJJII4I/9SQ9B+5UyOnfNl+PCAFCcwVswYc/CwO+52ce5KveitbLa23mqpw3/AARjKRretVKwPk92gjA+i711w+IaTXT11e8jd1TOS0H0BzsoEskUERIIa0dCfLyVRV3UNOI4S8Ho5xxlVUXLZLaiXdHV01NM2Q07tQ+6+J+HN9ltKbiuOSnbya2o5waBmQkSDH5ryqO8YGJKY/8Ay7Ks6eenqaYuhOXdSMbhRKDJU09G0qa8XMOk5x5zRl0bsAkeY81R1IwCcdRuqtr5ABqcdTTlrye/qtHb56esjB0AZHia7s7v+6pKHJ2dI5eKom217zQx5ONOwHbHsn0kLKq6PleWtETdtXcoJZHC4jAa3uFSzyVL5pZoQ4MzuR7bq09I5w3KzY2zjKSh4jioayta6iJbCC7prOMb+5wvSshfM11ppZKBlUZCHSSODR/cBq1Z89l9BcJ3H/FuGbbXuOXz07HOP92MH8V2x3Wznkq9FskSpF0OYIQhACEIQHVCfhGEAxCdhCAasb9qznf+MCNmdTp2Hb0W0WT+06nfUcLScvILJWnI8twol0SuzxC2wupoRO5uCzU3fyyp9Livri8/eMYA+Sj25uuGtjdueWx+PXSP1XSwZFVFnqQQs71Roh9E6WKSlt9S4NJy0NyO26rI4eRE1px93JytbNEZLNXtHVgjcfbWMrMXEMjpJBnflnHv2TukTJVZQVszp39fC3OkKDIcnyUgjxjHboucmHAEDfC0rSMrOJYHOOcDHcp1PK6nnbJESHN6kHqPJO889Smub3CnvsdGihljdRyPcSNWCwAdc/8AQpdrmfFVMIGdYxpHc4wqq3cw0mhpA32yM4Vnboy2eBhJyJB4vcrO9M79qjUN0RxuYd9Jy4KXaHUw4GrJpCBM5srh652Cp5tUfOe3JHLdnKbNHPDw7APEGPjGwPYlZsj5NI0QgoxZTVDZeVaYZcct82aZund7icYcc9N17D9mLeXwlFT5JENRNHv2xIcj2zkewC8leBNeeG4WuBbGWyP36eIE/qvXfs2jc3hKB7zkz1FRKD6OleR+GFtgYpGnSJUK5URCEIAQhCAlYRhKhANwjCckQDcKBfqF9ys9TRxFgfK3wl3Y5BCsUeXbzRg+cKCCOG81VJqlMvK0nU3DcDcfmptHRNhMczSc6wFrON+HX0HE8N0pg3kVWoO36OO5/dZeK4wmpFFkiTnhvTqQ5ZcidqjVjaqzSWuEz8+mc0aaqN0XXGD5rE3qBzYRC2MiVjsS6uo3wVvpqc0b+ZuCHasY6Kp4ioQ9zq8DXFIPGR/L/d+6LRae9o8zLS1+H5B7lcnsc13r2HotTV2ltTgxf6h2A/dVNVQVUH8OdhyD1I/Vd1NPRmljkirxsNvn5pWs1EDCk/BzOIDY3kZ2PZT6S2lp1zbnPQdFLmkQotnS3waIgx3U7n0Vva3QuqIYgS5zNT5OnhA8ydgm0tGanXEwbOGC4b58gFCrbfJamH4xwLJHvbMQ4jdrQ4N+ew+qzN2zRVIvZaiKoFU2ORjwIzp5Z1Dpvg4wVVyXxlygjgY3GmNjcB3TSMJ1ukijllnuTIwAA1/JfoABGwAxk5+aYx9I/TP8K1kkeQTGzsAOvZVq5Wy11GjjURCK4/D00YkcYo2sA6uleBp3HbcfJfQNpohb7XS0TTkQRtYffC81+zfhaaa7i6VwLqekOYi4YEshGGkZ6hrcD3Xq+FriZZDMIwnYRhWKjcJCnYRhANSJxCMICQhCEAIQhACEIQES600dVQzRyQiXwOLW9847LyDh/gyG4yw8Uw1x5ElVITT8vDmOD3DS75j8l7UTjofcLN1XD1otLai4RRyRNDzMYmSuEYkPV2kd/fb0VZItGXoo7tNGC0Y8QaBv3VdHVGIkdGlV9w4nt4qp4Z5ZHRndn8MAxn67qMb7ahEwmcuPqwjH0WWUpG3HGFbOVxtc8GZKRokYTnA+8Pkqx9d1jm1NcP6xhXH/AJFbANLKiQeojOysLfX011kMUDzIWtz/ABGAZ+q5uT/qW4R9SMpzad7xgtPh3Awnw0MlQ/TTxOeD3/lHz6LSVVdbKGoMcrGiUHxaKcbfMJ0V7t8jBh8rMdjGU5OtIrxiu2FotraEcx7+ZMBgNH3WZ8vp1XK8WiK50olpsyfESiOcbFunO7sHu30TpL/b2E6BI5zTnGnH4qJLxhK06oKRrmlwGXOJxv12ws0/nu4ne8TVDKrgyqo53OoqmGSmP3hO3BH02K532x2+ggdqqn/HshY9sZOGva52DhqbdOJqydghkhDWatQ0nG4UilvDLjwrdIa54lrGaJYnv3cACAd/5eq2YefHzMuRxvxN/wDZs+tl4Up5K0jQSWU7AMaYmAMHuSWk59VqcLOfZxLz+CrW/bZj2bekjh+i0vXOOy2R6MbGYRhORhSBuEmE7CEA3CMJyEA/KMpEIBcoykQgFWf4xvtZYqWCWioRU81+hzi4/wALyOkDcfMK/C5Vc8VNTvqJ3Bsce7iQoatErs8ptdfxJxLx1Txx3Tl09GxtRJHpAbHnHhLRjJOSPTC3PHFqrrpZwy25+KjeHN8ek4IwQPke6814jrIqXjiS8WZ1THz2t5wYR4tsHYHvgH6q7ouLLg6J1KznNGnUNRBODnqVyjJdHSUX2ZiopIIHPhNZSySs8Lmzx6ntO+2Q4D8FCkpYXamBlNqPcOwPpp/VQb3QwPrJJ4pQx0hJIeNRJ+aqZKSpxpijc/y0MwfwKo0jqmzQi0HIPKgJz2cf2U6itMgnzJGwRhpLBjJPvsscae4MOX0lU3G/WT912glMYa2V9Y2TydK4AKklouv0XdVTVETnYigDs74JH4YUNxqQd3Mb7Ocf2USqmikeCWvee/8AFcAuLWxy7R0ztX/6uP6qEGrJpa45L6hu/Yt/5XUVDY4I45LhE0M6BrGtP6qndTFsmHQ4Pk4Z/NS4bZUyNy2IgewCmrHRLkrqFzMVNRUVGeu+AfpgL0v7KbVb2QyXL42Nz5WlvwZYG8oZ75Pi8+y86puHi1pnrSAxh6f1LVUVY19P/l4zDIHNYCRkb7BXilE5y8ujcce8TU9hsxhpJ4mVVQCyDDwNA/mcPMjPTzUD7LRUSNrKrmzPoZmt5bpCSHuDiCRk++ff0WJ4opKmpgbTsaXAuzkDPQrdfZ7cKuKlpLTKxohiiLWnABaAMqVOMpFZQcYm6QkSrQcASJUiAEIQgFQhIgFSIykQCqs4miM9iq2AdWg/QgqyymVEYngkhPSRpafmFEtomPZ4lcZae31rp6sS08VP4tYGecD2xjcb9t9lo57PIZIqiB+kyNcxrh023H6qk+0+zSspqe5R5FNsx7WndjyME/otNwxeIrzw62pYI21FO9jnhjcBxb1+oCw3Uka3tHmksIjq5TVSasEknrkqVT1RqKgR0szGPDdQYXaSQPLPXv6qRxnb/gr7MyN7XQzv5jH5/lKzUToKW4a3sMkjRhkjnDS0nbIXVlezcWy/yvhfHIdTo2FzSfIdQqO5v/xCczSsGTsMbriZXQx6QxzXy9D/AG43XJkz2ZZGSCN+m6jVFk2jkabljxR4+Sm26NutobhpO2cLg10km75HE+6s6amlfHiIta89Djc+iraRZNsS70Zp6mGKVzXGRpeHAb6Rj9wokdZSsuUFO2c8wj7uD5E9flhaGptdVcKdlXqLpKZphkBbu0bHJHuBus1X22OrrIsxBoaAXuA3d/woTTZDtLZcS1JrHMiLWnsC3bUtHYbPrqaaGXLWkulcMeWwwsnTtIrIYY24c1wGAMfgtnBXRUTpq3Q9zowRDG3ppa3oT5dFDerH0kVl7v8AR0l2koaSF8wje6B84GW80Yy0dts4J9CttwtbZKap5sxBeIAHADoTj9ivKuDXVV84mjirXSGGSWSd5HmTk/ivc6BoEby3cZ0Nyew/6VOKPmimST4klCELcZQQhCAEISIASZSEpCgHZSFwTCU3KAeXJNfVcnOXIv8AMoDMcXwsqaaqoJmB0c38VmexP7FZ/h2lbarb8MMZfu71Wp4qjL6QVTN3wEk79Wnr+iyUVQ3QXF2cZ3A6Beb+RFqTRuwyTiVfGVJJUUsU7G6nUoLJR5sP3Xfhj6LEMl0vywDX2JGcL0iOvp5mF4y6N7S0j0WUvliFI7nxbxk5a4HIcF1xtzjZWTUWV1JJJzC9x1O8zucK0ZTtBL3Mcc46LjZooqmoYGNe05C9EvFgZRUjJ2kktaNiBsVLJSs88c0Rv6dz1KsrdXMhcHc1zR0Jb1Crbg8c0+5XGme3VjIb6lRxsdG2sdZFRGomaZS2SMNbrO537/kPms7WxunqS7R4nOIaGuO/0UNtYc6Wuyc4C1HD1ulfURyztBdglg8vU+ShY1dlnkXGjnZ6IUUTql7A2TPgx2/5UmVwqIHQuzpdsQCul2raVrm08cjcd5M/fP7LhG9jiQxzTjsFzzO9LojEvbLGzxRW8AU7AwnDGgbEnyyvSaSIw00cfUhoDvdYnhCg+LrRVSjMVPuM9C7t9FucrR+LCk5M4/kTukOQkyhajOKhIhABQhCARIUqRAMITSF1TSEBHcFxkUtzVydHlAVdV4mOaQCHDBB6Fec3ON1trHxZPJP+kfTyPsvUKiAuGyw/FdA/SXFmpvXPkueTGpovCTizBSunEpEU7GMJc5rHPwBt6/NX1BUOELWua2SBzcujfuD7KgraOOeUOLcPA6+atLfI4UzYneJzeiyTuLNSqReWihtDKyOVjSzBy6EuwR7ZWsuctFX0ssclbUtL92h0XhZ5Y0jp9VgGvOvZSG1ktM3Vz3MA9eiLJ/gcX6ZU11ir5ahwij5gz99gOCpNJwXcJdOrLAepxnClHiqcSuijqJhpIGojY5TzdKmtDg+pkfjYnVsrudeiFFvVk+nsFrtLw6rlbJKB91h1OK43e7vlppKem/y0ZbgDqSe2o/oojTsPREoDm4Izlc5ZG9F1jSVmdjr46uvEFWNTugLMjK2FponVcrRCw6nnr2AUOhs0b5S9kTQSMHPkttaKOOigbHTsaANslXjBz/RznPiXtsghoKKOmhyGtG7u7nHqVOa9QojsMruCtiVKjK3ZID0/Kjgp4Kkg65SrmHJwcgHISAoygBCEIASJUiATCaWp6EBzLM7KNUUbJmFjw1zT1BCm4SYQGNu3AlFW6n07jBJ2I3Cy9RwRfqN2aeOGsZ5NeGu/Fes4RhVcUyyk0eIVFFXULv8AOUlRTjsZYy0f7un4rlymzQFnNDgd9iDle6b9Og/NV9ZZbbWEmpoKWQnu6FpP1wuTwr0dFm+zwiagqC8sZywwk5xufkrWkbFTRadcY8zkBemT8EWSVxIpGs9GbBRH/Z7ZicthIPnnKh4bJWajAPr4Guw2UPP9LG5yutOZ6hw0xljc9T1/4W9bwNRRf6Ujh/8AIXRnCjGHaY/RTHBGJWWZsoLe3R23Wmo+y6wWKOLG+VNjoxHsOy7JV0cuxY11ahsWOyeGKQKE8JA1OAQAEqUIQChLlIEqA//Z"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                {numbersList ? (
                  numbersList.map((item, index) => (
                    <p>
                      <strong>{index}.</strong> {item.number}
                    </p>
                  ))
                ) : (
                  <h3>Loading data...</h3>
                )}
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="data:image/jpeg;base64,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"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My active bids</h1>
        <div className="ads-card-container-mypage">
          <div className="card" style={{ width: "18rem" }}>
            <img src className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My won auctions</h1>
        <div className="ads-card-container-mypage">
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mypage-sections" id="bid-history-section">
        <h1 id="bid-history-title">My bid history</h1>
        <div>
          <p>
            “Product”, Price: 255 kr, Date: 2024-03-19 13:15, Final price: 500 k
          </p>
        </div>
      </section>
    </>
  );
}

//export default Mypage;
