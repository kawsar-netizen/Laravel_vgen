import React, { useState } from "react";
import styles from "./RequiredSkills.module.css";
import DeleteIcon from "@material-ui/icons/Delete";

const RequiredSkills = ({ tags, setTags }) => {
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...tags, { ["skill"]: trimmedInput }]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();

      setTags(tagsCopy);
      setInput(poppedTag.skill);
    }
    setIsKeyReleased(false);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return (
    <div>
      <div className={styles.formInputField}>
        <input
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onKeyUp={() => setIsKeyReleased(true)}
          value={input}
          placeholder="please enter to add tag"
          type="text"
          className={styles.inputField}
        />
      </div>
      {tags.map((tag, i) => (
        <div key={tag.skill} className={styles.skillContainer}>
          <label className={styles.tagLevel}>{tag.skill}</label>
          <div className={styles.modifyButtons}>
            <DeleteIcon
              className={styles.actionButtons}
              onClick={() => deleteTag(i)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequiredSkills;
