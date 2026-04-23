function DeleteModal({ onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>

        <div className="modal-actions">
          <button onClick={onCancel}>NO, CANCEL</button>
          <button onClick={onConfirm}>YES, DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
