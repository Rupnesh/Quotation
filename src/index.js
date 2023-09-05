import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import './style.css';
import Doc from './DocService';
import PdfContainer from './PdfContainer';
import AddDeleteTableRows from './AddDeleteTableRows';
import helpers from './utils';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyLogo: '',
      comapny_name: '',
      bill_to_customer: '',
      bill_to_customer_address: '',
      quotation_date: new Date().toLocaleDateString(),
      quotationData: [],
      gst_selection: 'yes',
      totalAmount: 0,
    };
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      state[name] = value;
      return state;
    });
  };
  handleRow = (data) => {
    this.setState(
      (state) => {
        state.quotationData = data;
        return state;
      },
      () => { }
    );
  };
  calculateTotalAmount = () => {
    this.setState({ totalAmount: 0 });
    this.state.quotationData.map((item) => {
      this.setState((prevState) => {
        prevState.totalAmount = +prevState.totalAmount + +item.amount;
      });
    });
  };
  handleRadioChange = (e) => {
    this.setState((state) => {
      state.gst_selection = e.target.value;
      return state;
    });
  };
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          companyLogo: URL.createObjectURL(event.target.files[0]),
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  createPdf = (html) => Doc.createPdf(html, this.state.comapny_name);

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <section className="header-bar">
          <span className="header">Quotation</span>
        </section>
        <section className="wrapper" style={{ display: 'flex' }}>
          <section className="flex-column" style={{ margin: '20px' }}>
            <section className="flex-row">
              <input
                style={{ width: '80%' }}
                placeholder="Company Name"
                name="comapny_name"
                value={this.state.comapny_name}
                onChange={this.onChange}
              />
              <span class="btn btn-primary btn-file">
                Browse...
                <input
                  id="files"
                  type="file"
                  style={{ width: '20%' }}
                  name="companyLogo"
                  onChange={this.onImageChange}
                  className="filetype"
                />
              </span>
            </section>
            <section
              className="flex-column"
              style={{ marginTop: '16px', marginBottom: '16px' }}
            >
              Bill To :
              <input
                placeholder="Customer Name"
                name="bill_to_customer"
                value={this.state.bill_to_customer}
                onChange={this.onChange}
              />
              <input
                name="bill_to_customer_address"
                placeholder="Customer Address"
                value={this.state.bill_to_customer_address}
                onChange={this.onChange}
              />
              <input
                name="quotation_date"
                value={this.state.quotation_date}
                onChange={this.onChange}
              />
            </section>
            <AddDeleteTableRows setParentData={this.handleRow} />
            <section style={{ margin: '0px 8px' }}>
              Is GST applicable?
              <input
                type="radio"
                id="yes"
                name="gst_selection"
                value="yes"
                onChange={this.handleRadioChange}
                defaultChecked={this.state.gst_selection}
              />
              <label for="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="gst_selection"
                value="no"
                onChange={this.handleRadioChange}
              />
              <label for="no">No</label>
            </section>
            <section style={{ margin: '16px 8px' }}>
              <button
                className="btn-primary"
                onClick={this.calculateTotalAmount}
              >
                Calculate Total
              </button>
            </section>
          </section>
          <section style={{ margin: '16px' }}>
            <PdfContainer createPdf={this.createPdf}>
              <React.Fragment>
                <section className="flex-column">
                  <section className="padding-small border-bottom">
                    <section className="flex-row">
                      <div style={{ width: '91%' }}>
                        <h3>{this.state.comapny_name}</h3>
                      </div>
                      <img
                        style={{
                          width: '64px',
                          height: '64px',
                          alignSelf: 'end',
                        }}
                        placeholder="Name"
                        name="name"
                        src={this.state.companyLogo}
                        onChange={this.onChange}
                      />
                    </section>
                    <section
                      className="flex-row"
                      style={{ justifyContent: 'space-between' }}
                    >
                      <div className="flex-column">
                        <span>{this.state.bill_to_customer}</span>
                        <span>{this.state.bill_to_customer_address}</span>
                      </div>
                      <span>{this.state.quotation_date}</span>
                    </section>
                  </section>
                  <section
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-betwwen',
                    }}
                  >
                    <section
                      class="padding-small"
                      style={{ height: `100%- 300px` }}
                    >
                      <table
                        className="table flex full-border"
                        style={{ marginTop: '16px', width: '100%' }}
                      >
                        <thead>
                          <tr>
                            <th
                              className="border-right border-bottom"
                              style={{ width: '48px' }}
                            >
                              S.N.
                            </th>
                            <th
                              className="border-right border-bottom"
                              style={{ width: '300px', textAlign: 'left' }}
                            >
                              Item
                            </th>
                            <th
                              className="border-right border-bottom"
                              style={{ width: '48px' }}
                            >
                              Qty
                            </th>
                            <th
                              className="border-bottom"
                              style={{ width: '100px' }}
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.quotationData &&
                            this.state.quotationData.map((row, index) => {
                              return (
                                <tr key={index}>
                                  <td className="border-right">
                                    {row.serialNumber}
                                  </td>
                                  <td className="border-right">{row.item}</td>
                                  <td className="border-right">
                                    {row.quantity}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    {row.amount}
                                  </td>
                                </tr>
                              );
                            })}
                          <tr>
                            <td
                              colspan="3"
                              style={{ borderTop: '1px solid #737373' }}
                            >
                              Total
                            </td>
                            <td
                              style={{
                                borderTop: '1px solid #737373',
                                textAlign: 'right',
                              }}
                            >
                              Rs.
                              {helpers.convertToIndianCurrency(
                                this.state.totalAmount
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                    <section class="padding-small">
                      {/* <span>Amount in words : {this.state.totalAmount}</span> */}
                      <span>
                        Amount in words :{' '}
                        {this.state.totalAmount > 0 &&
                          helpers.converToIndianNumber(
                            this.state.totalAmount.toString()
                          )}{' '}
                        Rupees Only/-
                      </span>
                      {this.state.gst_selection === 'yes' && (
                        <p>Note : 18% GST applied</p>
                      )}
                    </section>
                  </section>
                </section>
              </React.Fragment>
            </PdfContainer>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));