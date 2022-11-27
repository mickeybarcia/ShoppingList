import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error) {
    console.error(error);
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>woops...</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
