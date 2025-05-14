import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
    Tailwind
} from "@react-email/components";

const ResetPasswordEmail = ({ username, token }) => {
    return (
        <Html lang="en">
            <Head>
                <title>Password Reset</title>
                <Font
                    fontFamily="Karla"
                    fallbackFontFamily="sans-serif"
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Tailwind>
                <Section className="text-center py-8 rounded-xl">
                    <Row>
                        <Heading as="h2">Hello {username},</Heading>
                    </Row>
                    <Row>
                        <Text>We noticed, that you have forgotten your password. Click on the link below to verify your password</Text>
                    </Row>
                    <Row>
                        <Button
                            className="box-border rounded-[8px] bg-blue-500 hover:bg-blue-600 px-[12px] py-[12px] text-center font-semibold text-white"
                            href={process.env.NEXT_PUBLIC_HOST + '/reset-password/' + token}
                            target="_blank"
                        >
                            Reset Password
                        </Button>
                        <Text className="text-red-500">This link will expire after 3 hours!</Text>
                    </Row>
                    <Row>
                        <Text className="text-red-500">
                            ** If you did not request, for this password reset link, please ignore this email!
                        </Text>
                    </Row>
                </Section>
            </Tailwind>
        </Html>
    )
}

export default ResetPasswordEmail;
