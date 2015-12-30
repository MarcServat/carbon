import React from 'react';
import Row from 'components/row';
import AnimatedMenuButton from 'components/animated-menu-button';
import Button from 'components/button';
import Pod from 'components/pod';

class QuickCreate extends React.Component {
  render() {
    return (
    <AnimatedMenuButton className='quick-create' direction='left' label="Create...">
      <Row>
        <Pod key='1'>
          <h2 className="title">Column 1</h2>
          PEEKABOO
        </Pod>
        <Pod key='2'>
          <h2 className="title">Column 2</h2>
          <Button>A Button</Button>
        </Pod>
        <Pod key='3'>
          <h2 className="title">Column 3</h2>
          <a href='#'>This will be a link</a>
        </Pod>
      </Row>
    </AnimatedMenuButton>

    );
  }
}

export default QuickCreate;
