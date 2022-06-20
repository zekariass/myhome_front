// @ts-nocheck
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { connect } from "react-redux";
import { nextPage, previousPage, goToPage } from "features/common/wizardSlice";

export class Wizard extends Component {
  /**
   * onSubmit is a required prop
   */
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  /**
   * State that hold the wizard page number and values for initial form state
   */
  constructor(props) {
    super(props);
    this.state = {
      // page: this.props.activeWizard,
      values: props.initialValues || {},
    };
  }

  /**
   * A static variable Page that holds the children of Wizard
   */
  static Page = ({ children }) => children;

  /**
   * A function that handles the nezt button and submit button click
   */
  next = (values) => {
    // this.setState({
    //   page: Math.min(this.state.page + 1, this.props.children.length - 1),
    //   values,
    // });

    const nextPage = Math.min(
      this.props.activeWizard + 1,
      this.props.children.length - 1
    );
    this.props.nextPage(nextPage);

    this.setState({
      values,
    });

    /**
     * Call the stepper set function from parrent component and increment it
     */
    this.props.setCurrentStep(
      Math.min(this.props.activeWizard + 1, this.props.children.length - 1)
    );
  };

  /**
   * A function that handles the next button and submit button click
   */
  previous = () => {
    // this.setState({
    //   page: Math.max(this.props.page - 1, 0),
    // });

    const prevPage = Math.max(this.props.activeWizard - 1, 0);
    this.props.nextPage(prevPage);

    this.props.setCurrentStep(Math.max(this.props.activeWizard - 1, 0));
  };

  /**
   * A function that validate the form.
   * To be called by React final form Form component
   */
  validate = (values) => {
    const activePage = React.Children.toArray(this.props.children)[
      this.props.activeWizard
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  /**
   * A function that handles the submision of the form
   */
  handleSubmit = (values) => {
    const { children, onSubmit } = this.props;
    const page = this.props.activeWizard;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    }
    return this.next(values);
  };

  render() {
    const { children } = this.props;
    const { values } = this.state;
    const page = this.props.activeWizard;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        onSubmit={this.handleSubmit}
        initialValues={values}
        validate={this.validate}
        mutators={{ ...arrayMutators }}
      >
        {({ handleSubmit, submitting }) => {
          // console.log("FORM: ", form);
          return (
            <form onSubmit={handleSubmit}>
              <div className="px-3">
                {activePage}
                <div className="row row-cols-1 row-cols-sm-2 my-4">
                  {page > 0 && (
                    <div className="col my-2 my-sm-0 d-flex align-items-sm-end justify-content-sm-start justify-content-center order-sm-0 order-1">
                      <button
                        type="button"
                        className="btn-general btn-general-hover px-3 py-2"
                        onClick={this.previous}
                      >
                        « Previous
                      </button>
                    </div>
                  )}
                  <div className="col d-flex align-items-sm-end justify-content-sm-end justify-content-center">
                    {!isLastPage && (
                      <button
                        type="submit"
                        id="next-wizard"
                        className="btn-general btn-general-hover px-3 py-2"
                      >
                        Next »
                      </button>
                    )}
                    {isLastPage && (
                      <button
                        type="submit"
                        className="btn-general btn-general-hover px-3 py-2"
                        disabled={submitting}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <FormSpy>
                {({ values }) => {
                  // console.log("FormSpy: ", values);
                }}
              </FormSpy>
            </form>
          );
        }}
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  activeWizard: state.propertyWizard.activePage,
});

const mapDispatchToProps = { nextPage, previousPage, goToPage };

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
