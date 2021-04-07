import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadCards } from "../../store/actions/cardActions";
import { loadCardgroups } from "../../store/actions/cardgroupActions";

const CardgroupSelect = (props) => {
  const cardgroups = useSelector((state) => state.cardgroupReducer.cardgroups);

  const dispatch = useDispatch();

  // console.log("is token?", localStorage.getItem("user_token"))

  useEffect(() => {
    dispatch(loadCardgroups());
  }, []);

  let cardgroupMenuitems = [];

  cardgroups.map(
    (cardgroup, index) =>
      (cardgroupMenuitems[index] = (
        <MenuItem key={index} value={cardgroup.id}>
          {cardgroup.title}{" "}
        </MenuItem>
      ))
  );

  const [group, setGroup] = React.useState("");

  useEffect(() => {
    if (props.showFirst && cardgroups.length) {
      setGroup(cardgroups[0].id);
      if (props.onChange) {
        props.onChange(cardgroups[0].id);
      }
    }
  }, [cardgroups]);

  const handleChange = (event) => {
    // console.log("evt", event.target.value)
    setGroup(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">
        Choose Cardgroup
      </InputLabel>
      <Select
        required
        color="secondary"
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={group}
        onChange={handleChange}
        label="group"
      >
        {cardgroupMenuitems.length ? (
          cardgroupMenuitems
        ) : (
          <MenuItem value="">
            <em>No groups exists</em>
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default CardgroupSelect;
