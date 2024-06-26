import { useState } from 'react'
import ProfessorModal from '@components/ProfessorModal'
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import scheduleData from '../data/programs'

const ScheduleGrid = () => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const { palette } = useTheme()

  const [open, setOpen] = useState<number | null>(null)

  const handleClickOpen = (id: number) => {
    setOpen(id)
  }

  const handleClose = () => {
    setOpen(null)
  }
  return (
    <Container sx={{ width: '90vw', maxWidth: '1000px', marginY: 8 }}>
      {!isMobile && (
        <Grid container spacing={3} py={2}>
          <Grid item xs={4}>
            <TitleTypography>시간</TitleTypography>
          </Grid>
          <Grid item xs={8}>
            <TitleTypography>프로그램</TitleTypography>
          </Grid>
        </Grid>
      )}
      <Divider sx={{ borderWidth: 1, backgroundColor: palette.primary.main }} />
      {scheduleData.map((item, index) => (
        <Box key={index}>
          {isMobile ? (
            <Grid
              container
              alignContent={'center'}
              alignItems={'center'}
              py={1}
            >
              <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                <Typography variant="caption" fontWeight={'bold'}>
                  {item.time}
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                onClick={item.id ? () => handleClickOpen(item.id) : undefined}
              >
                <Grid item>
                  <Typography
                    variant="body2"
                    fontWeight={'bold'}
                    color={palette.text.secondary}
                  >
                    {item.program}
                  </Typography>
                </Grid>
                {item.speaker && (
                  <Box display={'flex'} alignItems={'baseline'} mt={1}>
                    <Typography
                      variant="caption"
                      fontWeight={600}
                      color={palette.text.disabled}
                    >
                      {item.speaker}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3} alignContent={'center'}>
              <Grid item xs={4}>
                <ContentTypographyLight>{item.time}</ContentTypographyLight>
              </Grid>
              <Grid item xs={8} alignContent={'center'}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignContent={'center'}
                  sx={{ cursor: item.id ? 'pointer' : 'default' }}
                  onClick={item.id ? () => handleClickOpen(item.id) : undefined}
                >
                  {item.speaker ? (
                    <Box my={1}>
                      <Typography fontWeight={600} color={palette.text.primary}>
                        {item.program}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color={palette.text.disabled}
                        mt={-10}
                      >
                        {item.speaker}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Typography
                        sx={{ margin: '1rem 0rem', fontsize: '1rem' }}
                        color="primary"
                        fontWeight={'bold'}
                        textAlign={'center'}
                      >
                        {item.program}
                      </Typography>
                      <Typography
                        sx={{ margin: '1rem 0rem', fontsize: '1rem' }}
                        color="primary"
                        fontWeight={'bold'}
                        textAlign={'center'}
                      >
                        {item.speaker}
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
          <Divider />
        </Box>
      ))}
      <ProfessorModal id={open} open={Boolean(open)} onClose={handleClose} />
    </Container>
  )
}

export default ScheduleGrid

const TitleTypography = styled(Typography)`
  font-weight: bold;
  margin-vertical: 1rem;
`

const ContentTypography = styled(Typography)`
  margin: 1rem 0rem;
  fontsize: 1rem;
  font-weight: 700;
`

const ContentTypographyLight = styled(Typography)`
  margin: 1rem 0rem;
  fontsize: 1rem;
  font-weight: 500;
`
