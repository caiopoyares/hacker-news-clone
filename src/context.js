import React from 'react';

export const SwitcherContext = React.createContext();

class Provider extends React.Component {
  state = {
    darkMode: false,
    toggleDarkMode: () => {
      this.setState({ darkMode: !this.state.darkMode })
    }
  }

  render() {
    return (
      <SwitcherContext.Provider value={this.state}>
        {this.props.children}
      </SwitcherContext.Provider>
    )
  }
}

export default Provider;