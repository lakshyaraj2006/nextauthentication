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

const VerificationEmail = ({ username, token }) => {
    return (
        <Html lang="en">
            <Head>
                <title>Email Verification</title>
                <Font
                    fontFamily="Karla"
                    fallbackFontFamily="sans-serif"
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Tailwind>
                <Section className="text-center bg-gray-200 py-8 rounded-xl">
                    <Row>
                        <Heading as="h2">Hello {username},</Heading>
                    </Row>
                    <Row>
                        <Text>Thanks for registering to our website, click on the link below, to verify your email.</Text>
                    </Row>
                    <Row>
                        <Button
                            className="box-border rounded-[8px] bg-indigo-600 px-[12px] py-[12px] text-center font-semibold text-white"
                            href={process.env.NEXT_PUBLIC_HOST + '/verify/' + token}
                            target="_blank"
                        >
                            Click to Verify!
                        </Button>
                        <Text className="text-red-500">This link will expire after 8 hours!</Text>
                    </Row>
                    <Row>
                        <Text className="text-red-500">
                            ** If you did not request, for this verification email link, please ignore this email!
                        </Text>
                    </Row>
                </Section>
            </Tailwind>
        </Html>
    )
}

export default VerificationEmail;
