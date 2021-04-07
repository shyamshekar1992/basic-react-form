import React from "react";
import { CSVReader } from "react-papaparse";

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */

const buttonRef = React.createRef();
const buttonContactref = React.createRef();

class FileUpload extends React.Component {
  // State to store uploaded file
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      listings: [],
      products: [],
    };
  }

  handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
    if (buttonContactref.current) {
      buttonContactref.current.open(e);
    }
  };

  handleOnFileLoad = (data, file) => {
    const { name } = file;
    const nameofFile = name.replace(".csv", "");
    this.setState({
      [nameofFile]: data,
    });
    // console.log("fileDATA", data[0], file);
  };

  // find the distribution percentage of cars in percentage
  getlistofcars = () => {
    let Cars = this.state.listings.map((item) => {
      return item.data.make;
    });
    let counts = {};

    for (let i = 0; i < Cars.length; i++) {
      let num = Cars[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    for (let i = 0; i < Object.keys(counts).length; i++) {
      let car = Object.keys(counts)[i];
      let val = (counts[car] * 100) / Cars.length;
      counts[car] = val;
    }
    const arrayofcarspercentage = Object.keys(counts).map((a) => {
      return {
        make: a,
        percentage: counts[a],
      };
    });
    arrayofcarspercentage.sort((a, b) =>
      a.percentage > b.percentage ? -1 : b.percentage > a.percentage ? 1 : 0
    );
    // console.log("arrayofcarspercentage", arrayofcarspercentage);
    return arrayofcarspercentage;
  };
  GetlistingID = () => {
    let contacts = this.state.contacts.map((item) => {
      return item.data.listing_id;
    });
    let counts = {};

    for (let i = 0; i < contacts.length; i++) {
      let num = contacts[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    for (let i = 0; i < Object.keys(counts).length; i++) {
      let car = Object.keys(counts)[i];
      let val = (counts[car] * 100) / contacts.length;
      counts[car] = val;
    }
    const arrayofcarspercentage = Object.keys(counts).map((a) => {
      return {
        make: a,
        percentage: counts[a],
      };
    });
    arrayofcarspercentage.sort((a, b) =>
      a.percentage > b.percentage ? -1 : b.percentage > a.percentage ? 1 : 0
    );
    // console.log("arrayofcarspercentage", arrayofcarspercentage);
    return arrayofcarspercentage;
  };

  // handleOnError = (err, file, inputElem, reason) => {
  //   console.log(err);
  // };
  render() {
    const { contacts, listings } = this.state;
    //to find the average cost of all the dealers dealers
    let privatetype = 0;
    let dealertype = 0;
    let othertype = 0;
    let listofcars = [];
    let top5mostcontacted = [];
    let avgpriceof30mostcontactedlistings = 0;
    if (listings.length > 0) {
      let private1 = this.state.listings.filter((a) => {
        if (a.data.seller_type === "private1") return a.data;
      });

      console.log("private", private1);
      let Avgofprivate = private1.map((item) => {
        return Number(item.data.price);
      });
      // console.log(Avgofprivate);
      const reducer1 = (accumulator, currentValue) =>
        accumulator + currentValue;
      privatetype = Avgofprivate.reduce(reducer1, 0) / private1.length;
      //to find average price of other dealers
      let dealer = this.state.listings.filter((a) => {
        if (a.data.seller_type === "dealer") return a.data;
      });
      let Avgofdealer = dealer.map((item) => {
        return Number(item.data.price);
      });
      // console.log("Average price of dealer:", Avgofdealer);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      dealertype = Avgofdealer.reduce(reducer, 0) / dealer.length;
      // console.log("dealer", dealer);
      let other = this.state.listings.filter((a) => {
        if (a.data.seller_type === "other") return a.data;
      });
      let Avgofother = other.map((item) => {
        return Number(item.data.price);
      });
      // console.log("Average price of dealer:", Avgofdealer);
      const reducer2 = (accumulator, currentValue) =>
        accumulator + currentValue;
      othertype = Avgofother.reduce(reducer2, 0) / dealer.length;
      // console.log("other", private1, dealer, other);
      listofcars = this.getlistofcars();
    }
    if (this.state.contacts.length > 0 && this.state.listings.length > 0) {
      // this.GetlistingID();
      const top30average = this.GetlistingID().slice(0, 30);
      const top5average = this.GetlistingID().slice(0, 5);
      console.log("top 30 average", top30average);
      console.log("top5average", top5average);
      const top30mostcontactedavgprice = top30average.map((a) => {
        const data = this.state.listings.find((b) => b.data.id === a.make);
        return Number(data.data.price);
      });
      const reducer3 = (accumulator, currentValue) =>
        accumulator + currentValue;
      avgpriceof30mostcontactedlistings =
        top30mostcontactedavgprice.reduce(reducer3, 0) /
        top30mostcontactedavgprice.length;
      console.log(
        "top30mostcontactedavgprice",
        avgpriceof30mostcontactedlistings
      );
      top5mostcontacted = top5average.map((a) => {
        const data = this.state.listings.find((b) => b.data.id === a.make);
        return data.data;
      });
      console.log("filtered", top5mostcontacted);
    }

    // console.log("my new contacts and listings are ", contacts, listings);
    return (
      <div id="upload-box">
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          // onError={this.handleOnError}
          noClick
          noDrag
          config={{
            header: true,
          }}
        >
          {({ file }) => (
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#333",
                  lineHeight: "30px",
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: "60%",
                }}
              >
                {file && file.name}
              </div>
              <button
                type="button"
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: "10px",
                  marginRight: 0,
                  width: "15%",
                  padding: "10px 16px",
                  height: "40px",
                  lineHeight: "15px",
                  borderColor: "#333",
                }}
              >
                upload listing & contacts{" "}
              </button>
            </aside>
          )}
        </CSVReader>

        <h2>Average Listing Selling Price per Seller Type</h2>
        <div> Private €{privatetype}</div>
        <div> Dealers €{dealertype}</div>
        <div> Others €{othertype}</div>
        <h3>percentage of cars based on brand</h3>
        {listofcars.map((a) => (
          <div>
            {a.make} {a.percentage}%
          </div>
        ))}
        <br></br>
        <h4>Average price of 30% most contacted listings</h4>
        {Math.floor(avgpriceof30mostcontactedlistings)}
        <br></br>

        <h5>Top 5 most contacted listing</h5>
        {top5mostcontacted.map((a) => (
          <div>
            {a.id} {a.make}
            {a.price}
          </div>
        ))}
      </div>
    );
  }
}

export default function App() {
  return <FileUpload />;
}
