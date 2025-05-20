import { FaSearch, FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";

const ManagementSection = ({
  icon: Icon,
  title,
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  showAddButton = false,
  addButtonText = "",
  onAddClick,
}) => {
  return (
    <>
      <div className="header-section">
        <h2 className="section-title">
          <Icon className="icon" /> {title}
        </h2>
        {showAddButton && (
          <Button className="add-btn" onClick={onAddClick}>
            <FaPlus /> {addButtonText}
          </Button>
        )}
      </div>

      <div className="search-section mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control search-input"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </>
  );
};

export default ManagementSection;