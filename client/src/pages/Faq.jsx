import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

function Faq() {
  return (
    <>
      <div id="faq-container">
        <section id="faq-header">
          X-auction – Xperience your life to the fullest!
        </section>
        <div className="row" id="faq-card-container">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body"></div>
              <h5 className="card-title">FAQ</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#qna" className="btn btn-primary">
                Frequently asked questions
              </a>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body"></div>
              <h5 className="card-title">Policy</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#policy" className="btn btn-primary">
                Our policy
              </a>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body"></div>
              <h5 className="card-title">Delivery</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#delivery" className="btn btn-primary">
                About delivery
              </a>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body"></div>
              <h5 className="card-title">About us</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#about-us" className="btn btn-primary">
                Learn more about us
              </a>
            </div>
          </div>
        </div>

        <section id="faq-text-section">
          <h2>Frequently asked questions</h2>
          <div id="qna">
            <h4>1. How do I participate in an auction?</h4>
            <p>
              To participate in an auction, you'll first need to create an
              account on our site. Once logged in, browse through the listings
              and choose the item you're interested in. Click on the item to
              view more details and enter the bidding process. Follow the
              prompts to place your bid. Remember, bids are binding, so make
              sure you're ready to commit before placing one.
            </p>
            <h4>2. What payment methods are accepted?</h4>
            <p>
              We accept various payment methods, including credit/debit cards,
              PayPal, and bank transfers. The accepted payment methods may vary
              depending on the seller's preferences, so it's essential to review
              the listing's payment information before bidding.
            </p>
            <h4>3. Can I cancel a bid?</h4>
            <p>
              No. If you have made a bid it is binding and can't be canceled.
            </p>
          </div>
          <div id="policy">
            <h2>Policy</h2>
            Thank you for participating in our auction. Below are important
            policies you should be aware of: By placing a bid, you agree to
            adhere to our bidding guidelines. Bids are binding and cannot be
            retracted. Payment is due within 48 hours of winning the auction.
            Failure to make payment may result in account suspension. All sales
            are final. We do not accept returns or exchanges unless the item
            received is damaged or not as described. We offer standard shipping
            within the specified regions. Additional charges may apply for
            expedited shipping or international delivery. We are committed to
            protecting your privacy. Your personal information will not be
            shared with third parties without your consent. We employ various
            measures to prevent fraudulent activity. Any suspicious behavior
            will be investigated, and accounts may be suspended or terminated.
            By using our platform, you agree to abide by our terms of service.
            Please review them carefully before participating in auctions. If
            you have any questions or concerns regarding our policies, please
            don't hesitate to contact our customer support team. Thank you for
            your cooperation and understanding. Happy bidding!
          </div>
          <div id="delivery">
            <h2>Delivery</h2>
            We're excited to deliver your items to you as soon as possible.
            Please ensure your shipping address is up to date. Delivery
            typically takes between 3-7 business days. You'll receive tracking
            details once your items are dispatched. A signature may be required
            upon delivery. Shipping costs are covered within the auction fees.
            We partner with reputable shipping companies for safe delivery.
            Contact us for any questions or concerns. Thank you for choosing us!
            Happy bidding!
          </div>
          <div id="about-us">
            <h2>About us</h2>
            Welcome to X-Auction, the ultimate marketplace for extreme sports
            enthusiasts seeking unique and high-quality gear to fuel their
            adrenaline-fueled adventures. Whether you're into traditional
            extreme sports like snowboarding and skateboarding or crave the
            thrill of more obscure and bizarre activities, we've got you
            covered.<br></br> <br></br>
            At X-Auction, we cater to a diverse community of athletes and
            adventurers who thrive on pushing the boundaries of what's possible.
            From the mainstream to the downright eccentric, our platform
            features an eclectic range of used gear for an array of extreme and
            weird sports, including but not limited to: Extreme Ironing: Take
            your ironing skills to new heights as you conquer rugged terrains,
            mountain peaks, and even underwater depths—all while pressing your
            clothes to perfection. <br></br> <br></br>
            <ul>
              <li>
                Cheese Rolling: Gear up for the annual cheese rolling
                competition with our selection of durable helmets and protective
                gear. Whether you're chasing a wheel of cheese down a steep hill
                or braving the chaos of the chase, we've got the equipment you
                need to stay safe and stylish.
              </li>
              <li>
                Underwater Hockey: Dive into the depths of aquatic adventure
                with our underwater hockey gear. From fins and masks to
                specialized sticks and gloves, we'll equip you for an
                exhilarating game beneath the waves.
              </li>
              <li>
                Zorbing: Experience the thrill of rolling down hills in a giant
                inflatable ball with our zorbing gear collection. Whether you're
                rolling solo or challenging your friends to a race, our sturdy
                zorbing balls will keep you safe and bouncing with excitement.
              </li>
              <li>
                Urban Golf: Turn the concrete jungle into your personal golf
                course with our urban golfing gear. From compact clubs and balls
                to improvised obstacles, we've got everything you need to tee
                off in style amidst the urban landscape.
              </li>
            </ul>
            <br></br> <br></br>
            At X-Auction, we're more than just a marketplace—we're a community
            united by our passion for the extreme and the unconventional. Our
            platform provides a space for enthusiasts to buy, sell, and connect
            over their shared love of adrenaline-pumping activities, no matter
            how bizarre or offbeat.
            <br></br>
            Join us at X-Auction and discover a world of endless adventure and
            excitement. Whether you're shredding the slopes, rolling downhill in
            a giant cheese wheel, or sinking goals beneath the waves, we've got
            the gear to fuel your wildest dreams and turn your extreme sports
            fantasies into reality. Embrace the weird, embrace the extreme—only
            at X-Auction.
          </div>
        </section>
      </div>
      <div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default Faq;
