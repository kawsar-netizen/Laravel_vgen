import { FormControl, InputLabel, Select } from "@material-ui/core";

const SelectInput = ({name, value, onChange}) => {
  return (
    <FormControl variant="filled" className="w-100">
      <InputLabel >Level</InputLabel>
      <Select
        native
        value={value}
        name={name}
        onChange={onChange}
      >
        <option aria-label="None" value="" />
        <option value={10}>Beginner</option>
        <option value={20}>Intermidiate</option>
        <option value={30}>Expert</option>
      </Select>
    </FormControl>
  );
};

export default SelectInput;
