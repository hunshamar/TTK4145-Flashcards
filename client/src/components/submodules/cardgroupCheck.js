import { Checkbox, FormControlLabel, FormGroup, makeStyles } from "@material-ui/core"


const useStyles = makeStyles({
    input: {
      height: "20px",
      boxSizing: "border-box" // <-- add this
    }
  });


const CardgroupCheck = ({cardgroups, checkedCardgroups, setCheckedCardgroups}) => {
    const classes=useStyles()

    console.log("checkededdd", checkedCardgroups)
    console.log(cardgroups)

    const handleChange = (e) => {
        console.log("change", e.target.id, e.target.checked)
        let id = parseInt(e.target.id)
        let checked = e.target.checked

        if (checked){
            setCheckedCardgroups([...checkedCardgroups, id])
        } else {
            setCheckedCardgroups(checkedCardgroups.filter(checked_id => checked_id !== id))
        }

    }


    return (
        <div>
            <FormGroup>
            {cardgroups.map((cardgroup,i) => (
                    <FormControlLabel key={cardgroup.id}
                    control={<Checkbox color="primary" className={classes.input} checked={checkedCardgroups.includes(cardgroup.id)} onChange={handleChange} id={cardgroup.id.toString()} />}
                    label={cardgroup.title}
                />
              
            ))}
            </FormGroup>
        </div>
    )
}

export default CardgroupCheck