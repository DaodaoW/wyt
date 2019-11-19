import React from 'react';

export interface CheckBoxProps {
  labelOn: string;
  labelOff: string
}

interface CheckBoxState {
  isChecked: boolean
}
export class CheckBox extends React.Component<CheckBoxProps, CheckBoxState> {


  state: CheckBoxState  = {
    isChecked: false
  };

  onChange = (): void => {
    const { isChecked } = this.state;
    this.setState({
      isChecked: !isChecked
    })
  }

  render() {
    return (
      <label>
        <input
          type='checkbox'
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        { this.state.isChecked ? this.props.labelOn : this.props.labelOff }
      </label>
    )
  }
}