import React from "react";

export default ({ value, setValue }) => (
    <>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={(e) => setValue("")}>Clear</button>
    </>
);