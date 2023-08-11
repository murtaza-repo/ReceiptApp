import React, { useEffect, useState } from "react";
import Navbar from "../../Utils/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { TableFooter, TableHead } from "@mui/material";

import "./index.css";
import { Delete } from "@mui/icons-material";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import html2pdf from "html2pdf.js/dist/html2pdf";

const columns = [
  { id: "sno", label: "Sr." },
  { id: "description", label: "Description" },
  {
    id: "unit",
    label: "Unit",
  },
  {
    id: "rate",
    label: "Rate",
  },
  {
    id: "qty",
    label: "Qty",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "discount",
    label: "Discount",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
  },
];

const ManageReceipt = (props) => {
  const [addReceiptData, setAddReceiptData] = useState({
    sno: "",
    receiptNo: "",
    receiptDate: moment(new Date()).format("DD/MM/YYYY"),
    personName: "",
    items: [
      {
        sno: "",
        description: "",
        unit: "",
        rate: "0",
        qty: "0",
        discount: "0",
        amount: "0",
      },
      {
        sno: "",
        description: "",
        unit: "",
        rate: "0",
        qty: "0",
        discount: "0",
        amount: "0",
      },
      {
        sno: "",
        description: "",
        unit: "",
        rate: "0",
        qty: "0",
        discount: "0",
        amount: "0",
      },
      {
        sno: "",
        description: "",
        unit: "",
        rate: "0",
        qty: "0",
        discount: "0",
        amount: "0",
      },
      {
        sno: "",
        description: "",
        unit: "",
        rate: "0",
        qty: "0",
        discount: "0",
        amount: "0",
      },
      {
        sno: "",
        description: "",
        unit: "",
        rate: "0",
        qty: "0",
        discount: "0",
        amount: "0",
      },
      {
        sno: "",
        description: "",
        unit: "",
        rate: "0",
        qty: "0",
        discount: "0",
        amount: "0",
      },
      {
        sno: "",
        description: "",
        unit: "",
        rate: "0",
        qty: "0",
        discount: "0",
        amount: "0",
      },
    ],
    remarks: "",
    totalQty: "",
    totalAmt: "",
    discount: "",
    netAmount: "",
  });

  const [isDeleteModal, setDeleteModal] = useState(false);

  const { receiptNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (receiptNo) {
      let data = JSON.parse(localStorage.getItem("receiptData"));
      let currentReceipt = data.filter(
        (receipt) => receipt.receiptNo === receiptNo
      );
      setAddReceiptData(currentReceipt[0]);
    }

    //eslint-disable-next-line
  }, []);

  const handleAddRow = () => {
    let newRow = {
      sno: "",
      description: "",
      unit: "",
      rate: "0",
      qty: "0",
      discount: "0",
      amount: "0",
    };
    setAddReceiptData({
      ...addReceiptData,
      items: [...addReceiptData.items, newRow],
    });
  };

  const handleDelete = () => {
    let tempData = JSON.parse(localStorage.getItem("receiptData"));
    let updatedData = tempData.filter((data) => data.receiptNo !== receiptNo);
    localStorage.setItem("receiptData", JSON.stringify(updatedData));
    navigate("/receipt");
  };

  const handleDeleteRow = (index) => {
    let tempItems = [...addReceiptData.items];
    tempItems.splice(index, 1);

    setAddReceiptData({
      ...addReceiptData,
      items: [...tempItems],
    });
  };

  useEffect(() => {
    if (addReceiptData.items.length > 0) {
      // console.log("Added!");

      let items = addReceiptData.items;

      let updatedItems = items.map((item) => {
        let rate = Number(item.rate),
          qty = Number(item.qty),
          discount = Number(item.discount);
        let amount = rate * qty - qty * rate * (discount / 100);

        return { ...item, amount };
      });

      // setAddReceiptData(previous => ({...previous, items: updatedItems}));

      let updatedQty = items.reduce(
        (prev, curr) => {
          prev = Number(prev) + Number(curr.qty);
          return prev;
        },
        [0]
      );

      let updatedAmt = items.reduce(
        (prev, curr) => {
          prev = Number(prev) + Number(curr.amount);
          return prev;
        },
        [0]
      );

      if (updatedItems.length > 0 && updatedQty > 0) {
        let totalAmt = updatedAmt;
        let discount = addReceiptData.discount;
        let netAmount = Number(totalAmt) - Number(totalAmt * (discount / 100));

        setAddReceiptData((previous) => ({
          ...previous,
          items: updatedItems,
          totalQty: updatedQty,
          totalAmt: updatedAmt,
          netAmount,
        }));
      }
    }

    //eslint-disable-next-line 
  }, [JSON.stringify(addReceiptData.items)]);

  useEffect(() => {
    let totalAmt = addReceiptData.totalAmt;
    let discount = addReceiptData.discount;
    let netAmount = Number(totalAmt) - Number(totalAmt * (discount / 100));

    setAddReceiptData((previous) => ({ ...previous, netAmount }));

    //eslint-disable-next-line
  }, [addReceiptData.discount]);

  const handleSave = () => {
    let data = JSON.parse(localStorage.getItem("receiptData"));

    let current = data.findIndex((obj) => obj.receiptNo === receiptNo);

    if (current === -1) {
      data.push(addReceiptData);
    } else {
      data[current] = { ...addReceiptData };
    }

    localStorage.setItem("receiptData", JSON.stringify(data));

    navigate("/receipt");
  };

  useEffect(() => {
    if (!receiptNo) {
      let data = JSON.parse(localStorage.getItem("receiptData"));

      let sortedData = data.sort((a, b) => a.receiptNo - b.receiptNo);

      let sortedSerial = data.sort((a, b) => a.sno - b.sno);
      // console.log(sortedSerial);

      let newSerialNo = Number(sortedSerial[sortedSerial.length - 1]?.sno) + 1;
      let newReceiptNo =
        Number(sortedData[sortedData.length - 1]?.receiptNo) + 1;

      setAddReceiptData({
        ...addReceiptData,
        sno: newSerialNo,
        receiptNo: newReceiptNo,
      });
    }

    //eslint-disable-next-line
  }, []);

  const printDocument = () => {
    var element = document.getElementById('divToPrint');
    const options = {
      margin: 0,
      padding: 0,
      filename: "Receipt.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "a2",
        orientation: "portrait",
        putTotalPages: true,
      },
    };

    html2pdf().from(element).set(options).save();
  }

  return (
    <>
      <Navbar {...props} />
      <div
        className="auth-wrapper mt-5"
        id={"divToPrint"}
        style={{ height: "auto" }}
      >
        <div className="auth-inner mb-5" style={{ maxWidth: "90%" }}>
          <div className="mb-2 text-end">
            <button className="btn btn-primary me-2" onClick={handleSave}>
              Save
            </button>
            <Link to="/receipt">
              <button className="btn btn-primary me-2">Cancel</button>
            </Link>
            {receiptNo && (
              <button
                className="btn btn-primary me-2"
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </button>
            )}
            <button className="btn btn-primary me-2" onClick={printDocument}>
              Print
            </button>
          </div>
          <div className="row">
            <div className="col-6">
              <span>
                <strong>Receipt No:</strong>
              </span>{" "}
              &nbsp; <span>{addReceiptData?.receiptNo}</span>
            </div>
            <div className="col-6">
              <span>
                <strong>Receipt Date:</strong>
              </span>{" "}
              &nbsp; <span>{addReceiptData?.receiptDate}</span>
            </div>
          </div>
          <div className="row mt-4 mb-3">
            <div className="col-6 d-flex align-items-end">
              <span style={{ width: "12rem" }}>
                <strong>Person Name:</strong>
              </span>{" "}
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Enter name..."
                value={addReceiptData?.personName}
                onChange={(e) =>
                  setAddReceiptData({
                    ...addReceiptData,
                    personName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TableContainer>
                <Table
                  stickyHeader
                  style={{ border: "1px solid #eee" }}
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column?.id}
                          align={column?.align}
                          style={{ minWidth: column?.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell key={"action"}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addReceiptData &&
                      addReceiptData?.items?.map((row, index) => {
                        return (
                          <>
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ border: "1px solid #eee" }}
                                  >
                                    <input
                                      type={
                                        [
                                          "rate",
                                          "qty",
                                          "discount",
                                          "amount",
                                        ].includes(column.id)
                                          ? "number"
                                          : "text"
                                      }
                                      min={0}
                                      className="form-control"
                                      name={column.id}
                                      disabled={column.id === "amount"}
                                      value={value}
                                      onChange={(e) => {
                                        let tempItems = [
                                          ...addReceiptData.items,
                                        ];

                                        tempItems[index][e.target.name] =
                                          e.target.value;

                                        setAddReceiptData({
                                          ...addReceiptData,
                                          items: [...tempItems],
                                        });
                                      }}
                                    />
                                  </TableCell>
                                );
                              })}
                              <TableCell>
                                <button
                                  className="text-danger me-2"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                  }}
                                  onClick={() => handleDeleteRow(index)}
                                >
                                  <Delete />
                                </button>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                  <TableFooter>
                    <div className="p-2">
                      <button
                        onClick={handleAddRow}
                        className="btn btn-primary"
                      >
                        Add Row
                      </button>
                    </div>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label htmlFor="remarks">Remarks:</label>
              <textarea
                rows={3}
                value={addReceiptData?.remarks}
                onChange={(e) =>
                  setAddReceiptData({
                    ...addReceiptData,
                    remarks: e.target.value,
                  })
                }
                className="form-control"
                id="remarks"
              />
            </div>
            <div className="col-4">
              <label htmlFor="totalQty">Total Qty: &nbsp;</label>
              <input
                type="text"
                id="totalQty"
                disabled
                className="form-control"
                value={addReceiptData?.totalQty}
              />
            </div>
            <div className="col-4">
              <p>
                <label htmlFor="totalAmt">Total Amt: &nbsp;</label>
                <input
                  type="text"
                  id="totalAmt"
                  disabled
                  className="form-control"
                  value={addReceiptData?.totalAmt}
                />
              </p>
              <p>
                <label htmlFor="discount">Discount (%): &nbsp;</label>
                <input
                  type="number"
                  id="discount"
                  min={0}
                  className="form-control"
                  value={addReceiptData?.discount}
                  onChange={(e) => {
                    // handleDiscountChange(e.target.value);
                    setAddReceiptData({
                      ...addReceiptData,
                      discount: e.target.value,
                    });
                  }}
                />
              </p>
              <p>
                <label htmlFor="netAmount">Net Amount: &nbsp;</label>
                <input
                  type="number"
                  id="netAmount"
                  disabled
                  className="form-control"
                  value={
                    addReceiptData?.netAmount
                      ? Number(addReceiptData.netAmount).toFixed(2)
                      : 0
                  }
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={isDeleteModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h6>Are you sure you want to delete this receipt?</h6>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={"btn btn-secondary"}
            onClick={() => setDeleteModal(false)}
          >
            No
          </button>
          <button className={"btn btn-primary"} onClick={handleDelete}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageReceipt;
