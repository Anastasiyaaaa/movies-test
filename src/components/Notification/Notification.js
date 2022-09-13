import classes from './Notification.module.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store";

const Notification = () => {

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.ui.notifications);

  useEffect(() => {
    setTimeout(() => {
        dispatch(uiActions.notificationsInitial());
      }, 5000
    );
  }, [notifications]);

  let specialClasses = '';

  if (notifications.status === 'error') {
    specialClasses = classes.error;
  }
  if (notifications.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{notifications.title}</h2>
      <p>{notifications.message}</p>
    </section>
  );
};

export default Notification;