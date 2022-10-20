using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Core;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator mediator;

        protected IMediator Mediator =>
                mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result is null)
            {
                return NotFound();
            }
            else if (result.IsSuccess && result.Value is not null)
            {
                return Ok(result.Value);
            }
            else if (result.IsSuccess && result.Value is null)
            {
                return NotFound();
            }

            return BadRequest(result.Error);
        }
    }
}