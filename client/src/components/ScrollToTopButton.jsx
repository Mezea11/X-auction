// ScrollToTopButton.js
import React from 'react';

class ScrollToTopButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) { // Adjust 200 to the point where you want the button to appear
      this.setState({ showButton: true });
    } else {
      this.setState({ showButton: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  render() {
    return (
      <button
        className={`scroll-to-top-btn ${this.state.showButton ? 'show' : ''}`}
        onClick={this.scrollToTop}
      >
        ↑
      </button>
    );
  }
}

export default ScrollToTopButton;
