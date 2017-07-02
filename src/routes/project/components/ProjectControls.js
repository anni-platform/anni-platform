import React from "react";
import classNames from "classnames";
import { Button } from "components/baseline";
import { Link } from "react-router";

export const ProjectControls = ({ children }) => {
  return (
    <div className="ProjectControls">
      <form className="content">
        {children}
        <Button icon="add" />
      </form>
    </div>
  );
};

export const ProjectSectionNavItem = (
  { name, checked, onClick, projectPath }
) => {
  const styles = classNames({
    checked
  });

  return (
    <Link
      className="ProjectSectionNavItem"
      to={{
        pathname: projectPath,
        query: { section: name }
      }}
      onClick={onClick}
    >
      <label className={styles}>
        <h5 className="ProjectSectionNavItem-name">{name}</h5>
        {checked ? <div className="pip checked" /> : <div className="pip" />}
        <input type="radio" checked={checked} readOnly value={name} />
      </label>
    </Link>
  );
};
