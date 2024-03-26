import { useState } from "react";
import "./novaPoshta.scss";
import AllService from "../../services/allService";
const NovaPoshta = ({ data, setData, onChange, city, errors }) => {
  const [departments, setDepartments] = useState([]);
  const [active, setActive] = useState(false);
  const handleDepartment = (item) => {
    setData((prev) => ({
      ...prev,
      department: item.Description,
    }));
    setDepartments([]);
  };

  const allDepartment = async () => {
    const { data: cargo } = await await AllService.nvDepartmentCargo(
      city.Description
    );
    const { data: department } = await AllService.nvDepartmentDepartment(
      city.Description
    );
    setDepartments([...cargo, ...department]);
    setActive(true)
    return [...cargo, ...department];
  };
  const findDepartment = async (e) => {
    const newDep = await allDepartment();
    const findDep = newDep.filter((item) => {
      return item.Description.toLowerCase().includes(
        e.target.value.toLowerCase()
      );
    });
    setDepartments(findDep);
  };
  document.addEventListener("click",(e)=>{
    if(e.target.className !=="novaPoshta-input" || e.target.className!=="novaPoshta-list"){
      setActive(false)
    }
  })
  return (
    <div className="novaPoshta">
      <label htmlFor="department" className="novaPoshta-label">
        Виберить відділення
      </label>
      <input
        autoComplete="off"
        disabled={Object.keys(city).length === 0}
        type="text"
        placeholder="Виберіть відповідне відділення"
        name="department"
        className="novaPoshta-input"
        id="department"
        value={data.department}
        onChange={onChange}
        onClick={allDepartment}
        onKeyDown={findDepartment}
      />
      <p className="novaPoshta_error">{errors?.department?.msg}</p>
      <ul
        className={"novaPoshta-lists " + (active ? "active" : "")}
      >
        {departments.map((item) => (
          <li
            key={item.SiteKey}
            className="novaPoshta-list"
            onClick={() => handleDepartment(item)}
          >
            {item.Description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NovaPoshta;
