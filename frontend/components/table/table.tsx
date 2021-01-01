import React, { FC } from "react";

import { SalonsDto } from "../../../backend/dist/salons/dto/salons.dto";
import { parsePoint } from "../maps/map";

export type TableProps = {
  salons: SalonsDto[];
};

const Table: FC<TableProps> = ({ salons }) => {
  return (
    <>
      <table className="table table-responsive" style={{ maxHeight: "95vh" }}>
        <thead>
          <tr>
            <td>id</td>
            <td>coordinate - lat</td>
            <td>coordinate - lng</td>
          </tr>
        </thead>
        <tbody>
          {salons.map((salon) => {
            const points = parsePoint(salon.coordinate);
            return (
              <tr key={salon.id}>
                <td>{salon.id}</td>
                <td>{points[0]}</td>
                <td>{points[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
