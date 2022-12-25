import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomPostTable.css"

export default function CustomPostTable() {
  const navigate = useNavigate();
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "5%" }}>Date</th>
                  <th scope="col" style={{ width: "5%" }}>Category</th>
                  <th scope="col" style={{ width: "20%" }}>Title</th>
                  <th scope="col" style={{ width: "45%" }}>Content</th>
                  <th scope="col" style={{ width: "15%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>12.01.2022</td>
                  <td>Travel</td>
                  <td>Cristina</td>
                  <td>2.846</td>
                  <td>
                    <button type="button" class="btn btn-primary m-1">
                      <i class="far fa-eye"></i>
                    </button>
                    <button type="button" class="btn btn-success m-1">
                      <i class="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                <td>12.01.2022</td>
                  <td>Travel</td>
                  <td>Cristina</td>
                  <td>2.846</td>
                  <td>
                  <button type="button" class="btn btn-primary m-1">
                      <i class="far fa-eye"></i>
                    </button>
                    <button type="button" class="btn btn-success m-1">
                      <i class="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
