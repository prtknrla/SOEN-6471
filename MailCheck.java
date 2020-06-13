import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;



class MailCheck {

    public static void main(String[] args) {

        Properties prop = new Properties();
        prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.socketFactory.port", "465");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.port", "465");


        String user = "iCareCheck@gmail.com";
        String pass = "Family20@";

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(user, pass);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("iCareCheck@gmail.com"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse("narula.prateek276@gmail.com")
            );


            message.setSubject("Appointment scheduled");
            message.setText("Dear User,"
                    + "\n\n This is to inform you that you appointment for date 28th has been confirmed!"
                    + "\n\n Kindly be available at the facility 10 minutes before the scheduled time"
                    + "\n\n For making changes to you appointment please MailCheck our iCare application 24 hours before scheduled appointment time"
                    + "\n\n"+ "\n\n Thank you"
                            + "\n\n iCare");

            Transport.send(message);

            System.out.println("Mail Successfully send ..MailCheck the mail");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}