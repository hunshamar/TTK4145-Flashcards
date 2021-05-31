import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardgroups } from "../../store/actions/cardgroupActions";

const useStyles = makeStyles((theme) => ({
  selectItem: {
    "&:hover": {
      backgroundColor: theme.backgroundHover,
    },
  },
}));

const CardgroupSelect = ({ id, onChange, disabled, showFirst }) => {
  const classes = useStyles();

  const setCardgroup = onChange;
  const cardgroups = useSelector((state) => state.cardgroupReducer.cardgroups);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCardgroups());
  }, []);

  useEffect(() => {
    if (showFirst && cardgroups.length) {
      setCardgroup(cardgroups[0].id);
    }
  }, [cardgroups, showFirst]);

  useEffect(() => {
    if (id) {
      setCardgroup(id);
    }
  }, [id]);

  const handleChange = (event) => {
    setCardgroup(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">
        Choose card group
      </InputLabel>
      <Select
        required
        color="secondary"
        value={id}
        disabled={disabled}
        onChange={handleChange}
      >
        {cardgroups.length ? (
          cardgroups.map((cardgroup, index) => (
            <MenuItem
              key={index}
              value={cardgroup.id}
              className={classes.selectItem}
            >
              {cardgroup.title}
            </MenuItem>
          ))
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
