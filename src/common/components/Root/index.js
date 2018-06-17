import React from 'react';
import PropTypes from 'prop-types';

const ContextType = {
    insertCss: PropTypes.func.isRequired,
};

export default class Root extends React.PureComponent {
    static propTypes = {
        context: PropTypes.shape(ContextType).isRequired,
        children: PropTypes.element.isRequired,
    };

    static childContextTypes = ContextType;

    getChildContext() {
        return this.props.context;
    }

    render() {
        return React.Children.only(this.props.children);
    }
}